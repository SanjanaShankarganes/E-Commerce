import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FiSearch } from 'react-icons/fi';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = searchQuery 
                    ? `http://localhost:8080/search?searchTerm=${searchQuery}` 
                    : `http://localhost:8080/api/products/all`; 

                const response = await axios.get(url, {
                    params: {
                        page: currentPage - 1, 
                        size: pageSize,
                    },
                });

                console.log(response);

                if (url.includes("search")) {
                    setProducts(response.data.content || response.data); // Handle different response structures
                    setTotalPages(response.data.totalPages || 1); // Default to 1 if totalPages is missing
                } else {
                    setProducts(response.data.data.content || response.data.content); // Handle paginated data
                    setTotalPages(response.data.data.totalPages || 1); // Default to 1 if totalPages is missing
                }
            } catch (err) {
                setError('Error fetching product');
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [currentPage, pageSize, searchQuery]); 
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            setSearchQuery(event.target.value); 
            setCurrentPage(1); 
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div className="loader"></div></div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-2xl font-bold text-center mb-4">All Products</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {/* Search Bar */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/3"> {/* Adjust width as needed */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        onKeyPress={handleSearch}
                        className="border border-gray-300 py-2 pl-10 pr-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                    />
                    <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">MRP</th>
                            <th className="py-2 px-4 border-b">Discount</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id}>
                                    <td className="py-2 px-4 border-b">{product.id}</td>
                                    <td className="py-2 px-4 border-b">{product.name}</td>
                                    <td className="py-2 px-4 border-b">{product.category.category || product.category}</td>
                                    <td className="py-2 px-4 border-b">Rs. {product.mrp.toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b">{product.discount}%</td>
                                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>    
                                <td colSpan="6" className="text-center py-4">No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
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

export default AllProducts;
