import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        price: '',
        stock: '',
        image: null,
        bookFile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'title' ? value.toUpperCase() : value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleBookFileChange = (e) => {
        setFormData({ ...formData, bookFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const form = new FormData();
        form.append('title', formData.title);
        form.append('author', formData.author);
        form.append('isbn', formData.isbn);
        form.append('category', formData.category);
        form.append('price', formData.price);
        form.append('stock', formData.stock);
        form.append('status', 'Available');
        form.append('image', formData.image);
        form.append('bookFile', formData.bookFile);

        try {
            await axios.post('http://localhost:8000/api/book/add', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success('Book Added Successfully!');

            setFormData({
                title: '',
                author: '',
                isbn: '',
                category: '',
                price: '',
                stock: '',
                image: null,
                bookFile: null,
            });
        } catch (err) {
            console.error('Error adding book:', err.response?.data || err.message);
            if (err.response?.data?.message?.toLowerCase().includes('isbn')) {
                toast.error('ISBN already exists');
            } else {
                toast.error('Book addition failed');
            }
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <h4 className="text-center mb-4 text-primary fw-bold">ADD NEW BOOK</h4>
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Form.Group className="mb-3">
                                    <Form.Label className='fw-bold'>TITLE</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Enter Book Title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className='fw-bold'>AUTHOR</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="author"
                                        placeholder="Enter Author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className='fw-bold'>ISBN</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="isbn"
                                        placeholder="Enter ISBN"
                                        value={formData.isbn}
                                        onChange={handleChange}
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className='fw-bold'>CATEGORY</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="category"
                                        placeholder="Enter Category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                        required
                                    />
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className='fw-bold'>PRICE</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                placeholder="Price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                style={{ outline: 'none', boxShadow: 'none' }}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className='fw-bold'>STOCK</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="stock"
                                                placeholder="Stock"
                                                min="1"
                                                value={formData.stock}
                                                onChange={handleChange}
                                                style={{ outline: 'none', boxShadow: 'none' }}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label className='fw-bold'>BOOK IMAGE</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className='fw-bold'>BOOK PDF</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="bookFile"
                                        accept="application/pdf"
                                        onChange={handleBookFileChange}
                                        style={{ outline: 'none', boxShadow: 'none' }}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100 fw-bold">
                                    ADD BOOK
                                </Button>
                            </Form>
                            <ToastContainer position="top-center" autoClose={2000} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddBook;
