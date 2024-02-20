import { useEffect, useState, useMemo } from 'react';
import { getCities, City } from './api/getCities';
import Pagination from './components/Pagination/Pagination';
import PaginationPerPageSelectField from './components/Pagination/PaginationPerPageSelectField';
import PaginationNavigation from './components/Pagination/PaginationNavigation';
import PaginationNavigationButton from './components/Pagination/PaginationNavigationButton';
import SortableTable from './components/SortableTable/SortableTable';
import SortableTableContainer from 'components/SortableTable/SortableTableContainer';
import Search from './components/Search/Search';
import './App.css';
import Container from 'components/Container/Container';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Placeholder for totalPages calculation
  const [totalPages] = useState(0);

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        // Check for simulated error condition
        if (searchTerm === 'error') {
          throw new Error('Simulated search error');
        }

        const offset = currentPage * itemsPerPage;
        const citiesData = await getCities({ searchTerm, limit: itemsPerPage, offset });
        setCities(citiesData);
      } catch (err: any) {
        setError(err);
        setCities([]); // Clear cities on actual error
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search to improve performance
    const debounceTimer = setTimeout(() => {
      fetchCities();
    }, 150);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, currentPage, itemsPerPage]);

  // Define the columns for the table
  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id' as keyof City,
    },
    {
      Header: 'Country',
      accessor: 'country' as keyof City,
    },
    {
      Header: 'City Name',
      accessor: 'nameAscii' as keyof City,
    },
    {
      Header: 'Country Codes',
      accessor: 'countryIso3' as keyof City,
    },
  ], []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(0);
  };

  return (
    <div className="App">
      <header className="App-header"></header>

      <Container>
        <Search
          ariaLabel='Search for a city'
          placeholder='Search for a city'
          value={searchTerm}
          onSearch={setSearchTerm} />

        <SortableTableContainer
          ariaLabel='City List Table Container'
          title='City List'
          tabIndex={0}
          inlineStyles={{ maxHeight: '100rem' }}>

          {loading && <div>Loading...</div>}
          {!loading && cities.length === 0 && searchTerm && (
            <div>No cities match your search criteria.</div>
          )}
          {error && <div>Error: {error.message}</div>}

          {!error && !loading && cities.length > 0 && (
            <SortableTable
              ariaLabel='City List Data Table'
              caption='Table caption goes here'
              columns={columns}
              data={cities}
            />
          )}
        </SortableTableContainer>

        <Pagination ariaLabel='City list pager' variant='joined'>
          <PaginationPerPageSelectField perPage={itemsPerPage} onChange={handleItemsPerPageChange} />
          <PaginationNavigation>
            <PaginationNavigationButton variant='first' onClick={() => handlePageChange(0)} disabled={currentPage === 0} />
            <PaginationNavigationButton variant='previous' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} />
            <PaginationNavigationButton variant='next' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
            <PaginationNavigationButton variant='last' onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
          </PaginationNavigation>
        </Pagination>
      </Container>
    </div>
  );
};

export default App;
