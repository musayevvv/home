import React, { useEffect, useState } from 'react'
import styles from './Product.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from '../../../redux/reducer/productSlice'

const Product = () => {
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector((state) => state.products)



    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('Default')
    const [basket, setBasket] = useState([])
    const [wishlist, setWishlist] = useState([])





    useEffect(() => {
        dispatch(getProductsThunk())
        const storedBasket = JSON.parse(localStorage.getItem('basket')) || []
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
        setBasket(storedBasket)
        setWishlist(storedWishlist)
    }, [dispatch])

    const addToBasket = (item) => {
        const updatedBasket = [...basket]
        const existingBasket = updatedBasket.find((i) => i._id === item._id)

        if (existingBasket) {
            existingBasket.count += 1
        } else {
            updatedBasket.push({ ...item, count: 1 })
        }
        localStorage.setItem('basket', JSON.stringify(updatedBasket))
        setBasket(updatedBasket)
    }


    let count = basket.reduce((a, b) => a + b.count, 0)

    const addToWishlist = (item) => {
        const updatedWishlist = [...wishlist]
        const existingIndex = updatedWishlist.findIndex((i) => i._id === item._id)

        if (existingIndex > -1) {
            updatedWishlist.splice(existingIndex, 1)
        } else {
            updatedWishlist.push(item)
        }

        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
        setWishlist(updatedWishlist)
    }

    const filteredProduct = product
        ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === 'asc') return Number(a.price) - Number(b.price)
            if (sort === 'desc') return Number(b.price) - Number(a.price)
            return 0
        })

    if (loading) return <span>Yuklenir</span>
    if (error) return <span>Yukleme zamani xeta bas verdi</span>

    return (
        <section className={styles.productSection}>
            <div className={styles.container}>
                <div className={styles.count}><h1>{count}</h1></div>
                <div className={styles.productDiv}>
                    <form className={styles.formBox} onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="button" onClick={() => setSort('asc')}>ucuzdan bahaliya</button>
                        <button type="button" onClick={() => setSort('desc')}>bahalidan ucuza</button>
                        <button type="button" onClick={() => setSort('Default')}>default</button>
                    </form>

                    <div className={styles.productBox}>
                        {filteredProduct?.slice(0, 6).map((item) => (
                            <div className={styles.product} key={item._id}>
                                <img
                                    className={styles.productimage}
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className={styles.text}>
                                    <p>{item.name}</p>
                                    <span>{item.price}</span>
                                </div>
                                <div className={styles.btnBox}>
                                    <button onClick={() => addToBasket(item)}>add TO basket</button>
                                    <button onClick={() => addToWishlist(item)}>add TO wishlist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Product
