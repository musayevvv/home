import React, { useEffect, useState } from 'react'
import styles from './Basket.module.css'

const Basket = () => {

    const [basket, setBasket] = useState([])

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem('basket')) || []
        setBasket(storedBasket)
    })

    const updatedBasket = (newBasket) => {
        localStorage.setItem('basket', JSON.stringify(newBasket))
        setBasket(newBasket)
    }

    const increase = (_id) => {
        const newBasket = basket.map((item) => {
            if (item._id === _id) {
                return { ...item, count: item.count + 1 }
            }
            return item
        })
        updatedBasket(newBasket)
    }
    const decrease = (_id) => {
        const newBasket = basket.map((item) => {
            if (item._id === _id && item.count > 1) {
                return { ...item, count: item.count - 1 }
            }
            return item
        })
        updatedBasket(newBasket)
    }

    const remove = (_id) => {
        const newBasket = basket.filter((item) => item._id !== _id)
        updatedBasket(newBasket)
    }

    const totalPrice = basket.reduce((total, item) => {
        return total + item.count * item.price
    }, 0)

    return (
        <div className={styles.container}>
            <div className={styles.total}>
                total:   {totalPrice.toFixed(2)}
            </div>

            <div className={styles.productDiv}>
                {basket.map((item) => (
                    <div className={styles.product}>
                        <div>
                            <img src={item.image} alt="" />
                            <div className={styles.info}>
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                                <p>{item.count}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => increase(item._id)}>+</button>
                            <button onClick={() => decrease(item._id)} disabled={item.count === 1}>-</button>
                            <button onClick={() => remove(item._id)}>sil</button>
                        </div>
                    </div>
                ))}
            </div>

        </div >
    )
}

export default Basket
