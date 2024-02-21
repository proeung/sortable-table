import { useEffect, useState, useMemo } from 'react';
import { getCities, City } from './api/getCities';
import { StatusType } from 'types/status';
import Pagination from './components/Pagination/Pagination';
import PaginationPerPageSelectField from './components/Pagination/PaginationPerPageSelectField';
import PaginationNavigation from './components/Pagination/PaginationNavigation';
import PaginationNavigationButton from './components/Pagination/PaginationNavigationButton';
import SortableTable from './components/SortableTable/SortableTable';
import SortableTableContainer from 'components/SortableTable/SortableTableContainer';
import Search from './components/Search/Search';
import EmptyState from 'components/EmptyState/EmptyState';
import CrashState from 'components/CrashState/CrashState';
import Button from 'components/Button/Button';
import Container from 'components/Container/Container';
import { ReactComponent as MagnifyingGlass } from 'assets/MagnifyingGlass.svg';
import './App.css';
import Spinner from 'components/Spinner/Spinner';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<StatusType>('loading');
  const [loading, setLoading] = useState<boolean>(false);

  // Define the columns for the table
  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id' as keyof City,
    },
    {
      Header: 'City Name',
      accessor: 'nameAscii' as keyof City,
    },
    {
      Header: 'Country',
      accessor: 'country' as keyof City,
    },
    {
      Header: 'Population',
      accessor: 'population' as keyof City,
    },
    {
      Header: 'Country Codes',
      accessor: 'countryIso3' as keyof City,
    },
  ], []);

  useEffect(() => {
    // Set loading to true when starting the search
    setLoading(true);
    const fetchCities = async () => {
      setStatus('loading');
      try {
        // Check for simulated error condition
        if (searchTerm === 'error') {
          throw new Error('Simulated search error');
        }

        // Get offset amount for pagaination
        const offset = (currentPage - 1) * itemsPerPage;
        const response = (await getCities({ searchTerm, limit: itemsPerPage, offset }));

        setCities(response.data);

        // Get total pages and default to 1
        setTotalPages(Math.max(Math.ceil(response.pagination.total / itemsPerPage), 1));

        // Check for search status
        if (response.data.length === 0) {
          if (searchTerm) {
            setStatus('success');
          } else {
            setStatus('empty');
          }
        } else {
          setStatus('success');
        }

      } catch (err: any) {
        setError(err);
        setCities([]);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search to improve performance
    const debounceTimer = setTimeout(() => {
      fetchCities();
    }, 150);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // console.log(totalPages);
  return (
    <div className='App mt-16 md:mt-28 lg:mt-32'>
      <header className='App-header'></header>

      <Container>
        <SortableTableContainer
          ariaLabel='City List Table Container'
          heading='City List'
          description='Description text goes here. Lorem ipsum dolor.'
          tabIndex={-1}
          inlineStyles={{ maxHeight: '75vh' }}>

          <Search
            ariaLabel='Search for a city'
            placeholder='Search for a city'
            value={searchTerm}
            onSearch={setSearchTerm} />

          <SortableTable
            ariaLabel='City List Data Table'
            caption=''
            columns={columns}
            data={cities}
            status={status}
            empty={
              <EmptyState
                illustration={<MagnifyingGlass />}
                heading='No results found'
                description='No cities match your search criteria.'
                actions={
                  <Button
                    variant='btn-tertiary'
                    ariaLabel='Click here to clear search input.'
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>}
              />
            }
            crash={
              <CrashState
                heading='Search Error'
                message={error?.message}
              />
            }
            loading={loading && <Spinner
              title='Loading the city data.'
            />
            }
          />

        </SortableTableContainer>

        <Pagination ariaLabel='City list pager' variant='joined'>
          <PaginationPerPageSelectField
            perPage={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
          <PaginationNavigation>
            <PaginationNavigationButton
              variant='first'
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1} />
            <PaginationNavigationButton
              variant='previous'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1} />
            <PaginationNavigationButton
              variant='next'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 1} />
            <PaginationNavigationButton
              variant='last'
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || totalPages === 1} />
          </PaginationNavigation>
        </Pagination>
      </Container>
    </div>
  );
};

export default App;
