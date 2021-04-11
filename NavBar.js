import React from 'react'

export const NavBar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">Jaldi.io Event Calendar</span>
            <button className="btn btn-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span>  Exit</span>
            </button>
        </div>
    )
}