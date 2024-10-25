import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CategoryProducts = () => {
    const { id: categoryId } = useParams(); 
    const [category, setCategory] = useState(null); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);
    const [sort, setSort] = useState('name,asc');

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const categoryResponse = await axios.get(`http://localhost:8080/api/categories/${categoryId}`);
                setCategory(categoryResponse.data.data);
            } catch (err) {
                setError('Error fetching category details');
            }
        };

        const fetchProducts = async () => {
            setLoading(true);
            setError(''); 
            try {
                const response = await axios.get(`http://localhost:8080/api/products`, {
                    params: {
                        categoryId,
                        page: currentPage - 1, 
                        size: pageSize,
                        sortField: sort.split(',')[0], 
                        sortDir: sort.split(',')[1],   
                    }
                });
                setProducts(response.data.data.content); 
                setTotalPages(response.data.data.totalPages);
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchCategoryDetails();
            fetchProducts();
        }
    }, [categoryId, currentPage, pageSize, sort]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setCurrentPage(1); 
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div className="loader"></div></div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-2xl font-bold text-center mb-4">
                {category ? `${category.category} Products` : 'Products'}
            </h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center mb-4">
                <label className="mr-2">Sort by:</label>
                <select value={sort} onChange={handleSortChange} className="border rounded px-2 py-1">
                    <option value="name,asc">Name (A-Z)</option>
                    <option value="name,desc">Name (Z-A)</option>
                    <option value="mrp,asc">Price (Low to High)</option>
                    <option value="mrp,desc">Price (High to Low)</option>
                    <option value="discount,asc">Discount (Low to High)</option>
                    <option value="discount,desc">Discount (High to Low)</option>
                    <option value="quantity,asc">Quantity (Low to High)</option>
                    <option value="quantity,desc">Quantity (High to Low)</option>
                </select>
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
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id}>
                                    <td className="py-2 px-4 border-b">{product.id}</td>
                                    <td className="py-2 px-4 border-b">{product.name}</td>
                                    <td className="py-2 px-4 border-b">{product.category.category}</td>
                                    <td className="py-2 px-4 border-b">Rs{product.mrp.toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b">{product.discount}%</td>
                                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">No products available in this category</td>
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

export default CategoryProducts;
