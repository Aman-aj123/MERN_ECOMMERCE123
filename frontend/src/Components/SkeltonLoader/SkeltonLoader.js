import React from 'react'
import "./SkeltonLoader.css"

const SkeltonLoader = () => {
    return (
        <div className="product-wrapper">
            <div className="left-column">
                <div className="skeleton skeleton-image"></div>
                <div className="image-thumbnails">
                    <div className="skeleton skeleton-thumbnail"></div>
                    <div className="skeleton skeleton-thumbnail"></div>
                    <div className="skeleton skeleton-thumbnail"></div>
                </div>
            </div>
            <div className="right-column">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-rating"></div>
                <div className="skeleton skeleton-price"></div>
                <div className="skeleton skeleton-availability"></div>
                <div className="fit-menu flex items-center">
                    <div className="skeleton skeleton-size"></div>
                    <div className="skeleton skeleton-quantity"></div>
                </div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-about-item"></div>
                <div className="skeleton skeleton-btn"></div>
                <div className="skeleton skeleton-btn"></div>
            </div>
        </div>
    )
}

export default SkeltonLoader