// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CategoryItem from './CategoryItem';
// import { useNavigate } from 'react-router-dom';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import { FiSearch } from 'react-icons/fi'; 

// const ProductTable = () => {
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [pageSize] = useState(10);
//     const [searchQuery, setSearchQuery] = useState(''); 
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCategories = async () => {
//             setLoading(true);
//             const token = localStorage.getItem('jwtToken');

//             try {
//                 const response = await axios.get(`http://localhost:8080/api/categories`, {
//                     params: {
//                         page: currentPage - 1,
//                         size: pageSize,
//                         search: searchQuery, 
//                     },
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (response.data && response.data.success) {
//                     setCategories(response.data.data.content || []);
//                     setTotalPages(response.data.data.totalPages || 0);
//                 } else {
//                     setError('Failed to fetch categories');
//                 }
//             } catch (err) {
//                 if (err.response && err.response.status === 401) {
//                     setError('Unauthorized. Please log in again.');
//                     navigate('/login');
//                 } else {
//                     setError('Error fetching categories');
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCategories();
//     }, [currentPage, pageSize, searchQuery, navigate]);

//     const handlePageChange = (event, page) => {
//         setCurrentPage(page);
//     };

//     const handleViewAllClick = () => {
//         navigate('/productlist'); 
//     };

//     const handleSearch = (event) => {
//         if (event.key === 'Enter') {
//             setSearchQuery(event.target.value);
//             setCurrentPage(1); 
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <div className="loader"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-7xl mx-auto py-8 px-4">
//             <h2 className="text-3xl font-bold text-center mb-6">Product Categories</h2>
//             {error && <p className="text-red-500 text-center">{error}</p>}

//             {/* Flex container for search bar and button */}
//             <div className="flex justify-between items-center mb-6">
//                 {/* Search Bar */}
//                 <div className="relative w-1/3"> {/* Adjust width as needed */}
//                     <input
//                         type="text"
//                         placeholder="Search categories..."
//                         onKeyPress={handleSearch}
//                         className="border border-gray-300 py-2 pl-10 pr-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
//                     />
//                     <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
//                 </div>

//                 {/* View All Products Button */}
//                 <button
//                     onClick={handleViewAllClick}
//                     className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
//                 >
//                     View All Products
//                 </button>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
//                 <table className="min-w-full bg-white rounded-lg">
//                     <thead>
//                         <tr className="bg-blue-600 text-white">
//                             <th className="py-3 px-6 text-left text-sm font-medium">ID</th>
//                             <th className="py-3 px-6 text-left text-sm font-medium">Name</th>
//                             <th className="py-3 px-6 text-left text-sm font-medium">Created At</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {categories && categories.length > 0 ? (
//                             categories.map(category => (
//                                 <CategoryItem key={category.id} category={category} />
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="3" className="text-center py-6 text-gray-500">No categories available</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination Controls */}
//             <div className="flex justify-center mt-6">
//                 <Stack spacing={2}>
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={handlePageChange}
//                         variant="outlined"
//                         color="primary"
//                     />
//                 </Stack>
//             </div>
//         </div>
//     );
// };

// export default ProductTable;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryItem from './CategoryItem';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FiSearch } from 'react-icons/fi';

const ProductTable = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const token = localStorage.getItem('jwtToken');

            try {
                const response = await axios.get(`http://localhost:8080/api/categories`, {
                    params: {
                        page: currentPage - 1,
                        size: pageSize,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Response Data:', response.data);
                console.log('Categories Content:', response.data.data.content);

                if (response.data && response.data.success) {
                    setCategories(response.data.data.content || []);
                    setFilteredCategories(response.data.data.content || []);
                    setTotalPages(response.data.data.totalPages || 0);
                } else {
                    setError('Failed to fetch categories');
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized. Please log in again.');
                    navigate('/login');
                } else {
                    setError('Error fetching categories');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [currentPage, pageSize, navigate]);

    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = categories.filter(category => {
                const categoryName = category.category || ''; 
                return categoryName.toLowerCase().includes(lowercasedQuery);
            });
            setFilteredCategories(filtered);
            setTotalPages(Math.ceil(filtered.length / pageSize)); 
        } else {
            setFilteredCategories(categories); 
            setTotalPages(Math.ceil(categories.length / pageSize));
        }
    }, [categories, searchQuery, pageSize]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleViewAllClick = () => {
        navigate('/productlist');
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            setSearchQuery(event.target.value);
            setCurrentPage(1); 
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold text-center mb-6">Product Categories</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex justify-between items-center mb-6">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        onKeyPress={handleSearch}
                        className="border border-gray-300 py-2 pl-10 pr-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                    />
                    <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                </div>
                <button
                    onClick={handleViewAllClick}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
                >
                    View All Products
                </button>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="py-3 px-6 text-left text-sm font-medium">ID</th>
                            <th className="py-3 px-6 text-left text-sm font-medium">Category</th> {/* Updated Header */}
                            <th className="py-3 px-6 text-left text-sm font-medium">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map(category => (
                                <CategoryItem key={category.id} category={category} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-6 text-gray-500">No categories found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-6">
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        color="primary"
                    />
                </Stack>
            </div>
        </div>
    );
};

export default ProductTable;
