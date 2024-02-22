import { useEffect, useState, useMemo } from 'react';
import { getCities, City } from './api/getCities';
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
import Section from 'components/Section/Section';
import Spinner from 'components/Spinner/Spinner';
import { ReactComponent as MagnifyingGlass } from 'assets/MagnifyingGlass.svg';
import './App.css';

const App = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Define the columns for the table
  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' as keyof City },
    { Header: 'City Name', accessor: 'nameAscii' as keyof City },
    { Header: 'Country', accessor: 'country' as keyof City },
    { Header: 'Population', accessor: 'population' as keyof City },
    { Header: 'Country Codes', accessor: 'countryIso3' as keyof City },
  ], []);

  // Fetch cities data from getCities API
  const fetchCities = async () => {
    setLoading(true);
    try {
      // Check for simulated error condition
      if (searchTerm === 'error') {
        throw new Error('Simulated search error');
      }

      // Get offset amount for pagaination
      const offset = (currentPage - 1) * itemsPerPage;

      // Fetch the data
      const response = await getCities({ searchTerm, limit: itemsPerPage, offset });
      setCities(response.data);

      // Get total pages and default to 1
      setTotalPages(Math.max(Math.ceil(response.pagination.total / itemsPerPage), 1));
    } catch (err: any) {
      setError(err);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to debounce the search input and fetch data based on searchTerm changes
  useEffect(() => {
    setLoading(true);
    const debounceTimer = setTimeout(() => {
      currentPage === 1 ? fetchCities() : setCurrentPage(1);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // useEffect hooks for fetching data when itemsPerPage changes
  useEffect(() => {
    currentPage === 1 ? fetchCities() : setCurrentPage(1);
  }, [itemsPerPage]);

  // useEffect hooks for fetching data when currentPage changes
  useEffect(() => {
    fetchCities();
  }, [currentPage]);

  // Handlers for pagination controls
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className='App mt-16 md:mt-28 lg:mt-32'>
      <header className='App-header'></header>

      <Section
        heading='City List'
        description='Description text goes here. Lorem ipsum dolor.'
      >
        <Search
          ariaLabel='Search for a city'
          placeholder='Search for a city'
          value={searchTerm}
          onSearch={setSearchTerm} />

        <SortableTableContainer
          ariaLabel='City List Table Container'
          tabIndex={-1}
          style={{ maxHeight: '50rem' }}>

          <SortableTable
            ariaLabel='City List Data Table'
            caption=''
            columns={columns}
            data={cities}
            loading={loading}
            error={error}
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
                  </Button>
                }
              />
            }
            crash={
              <CrashState
                heading='Search Error'
                message={error?.message}
              />
            }
            loader={
              <Spinner
                title='Loading the city data.'
              />
            }
          />
        </SortableTableContainer>

        <Pagination ariaLabel='City list pager'>
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
      </Section>
    </div>
  );
};

export default App;
