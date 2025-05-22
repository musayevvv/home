

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductsThunk, getProductsThunk, postProductsThunk } from '../../redux/reducer/productSlice';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { product, error, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            image: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().max(15, 'En fazla 15 karakter').required('Zorunlu'),
            price: Yup.string().max(20, 'En fazla 20 karakter').required('Zorunlu'),
            image: Yup.string().url('Geçerli bir URL girin').required('Zorunlu'),
        }),
        onSubmit: (values) => {
            dispatch(postProductsThunk(values));
            formik.resetForm();
        },
    });

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <label htmlFor="name">Ürün Adı</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}

                <label htmlFor="price">Fiyat</label>
                <input
                    id="price"
                    name="price"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price && <div>{formik.errors.price}</div>}

                <label htmlFor="image">Görsel URL</label>
                <input
                    id="image"
                    name="image"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.image}
                />
                {formik.touched.image && formik.errors.image && <div>{formik.errors.image}</div>}

                <button type="submit">Ürünü Ekle</button>
            </form>

            <div className={styles.productBox}>
                {product.map((item) => (
                    <div className={styles.product} key={item._id}>
                        <img src={item.image} alt={item.name} className={styles.productimage} />
                        <div className={styles.text}>
                            <p>{item.name}</p>
                            <span>{item.price}</span>
                            <button
                                onClick={() => dispatch(deleteProductsThunk(item._id))}
                                className={styles.delete}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
