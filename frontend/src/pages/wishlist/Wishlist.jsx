import React, { useEffect, useState } from 'react'
import styles from '../basket/Basket.module.css'

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
        setWishlist(storedWishlist)
    })

    const updatedWishlist = (newWishlist) => {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist))
        setWishlist(newWishlist)
    }



    const remove = (_id) => {
        const newWishlist = wishlist.filter((item) => item._id !== _id)
        updatedWishlist(newWishlist)
    }



    return (
        <div className={styles.container}>
            <div className={styles.productDiv}>
                {wishlist.map((item) => (
                    <div className={styles.product}>
                        <div>
                            <img src={item.image} alt="" />
                            <div className={styles.info}>
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => remove(item._id)}>sil</button>
                        </div>
                    </div>
                ))}
            </div>

        </div >
    )
}

export default Wishlist
