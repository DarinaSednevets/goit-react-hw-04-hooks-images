
import { useState } from "react";
import styles from "./Searchbar.module.css"
import PropTypes from "prop-types"

function Searchbar(props) {
    const [query, setQuery] = useState('');

    const handleChange = event => {
        setQuery(event.target.value);
    };


    const handleSubmit = event => {
        event.preventDefault();
        props.onSubmit(query);
        setQuery('');
    }

    return (
        <header className={styles.Searchbar}>
            <form onSubmit={handleSubmit} className={styles.SearchForm}>
                <button type="submit" className={styles.Button}>
                    <span className={styles.ButtonLabel}>Search</span>
                </button>

                <input
                    className={styles.Input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                />
            </form>
        </header>
    )
}

export default Searchbar;

PropTypes.Searchbar = {
    onSubmit: PropTypes.func.isRequired,
}