import React from "react";
import { getCategories, getQuestions } from "../../redux/reducers/categoryReducer";
import { connect } from "react-redux";
import styles from "./CategotyList.module.scss"
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, } from "react-router-dom";


const CategotyList = ({ categories, getCategories, getQuestions }) => {

    
    const navigate = useNavigate();
    
    useEffect(() => {
        getCategories()
    }, [])

    const hanldeCurrentCategory = (item) => {
        navigate(`/scients/${item}`)
    }
    return (
        <div className={styles.wrap}>
            <div></div>
            <div className={styles.container}>
                {categories?.map(item => {
                    return (
                        <div onClick={()=>hanldeCurrentCategory(item)} className={styles.categoryItem}>
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories
})

export default connect(mapStateToProps, { getCategories, getQuestions })(CategotyList)