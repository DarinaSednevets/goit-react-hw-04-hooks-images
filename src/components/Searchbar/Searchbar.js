import { Component } from "react";
import styles from "./Searchbar.module.css"
import PropTypes from "prop-types"

class Searchbar extends Component {

    state = {
        query: ''
    }
    handleChange = event => {
        this.setState({
            query: event.currentTarget.value,
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }


    render() {
        return (
            <header className={styles.Searchbar}>
                <form onSubmit={this.handleSubmit} className={styles.SearchForm}>
                    <button type="submit" className={styles.Button}>
                        <span className={styles.ButtonLabel}>Search</span>
                    </button>

                    <input
                        className={styles.Input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
}

export default Searchbar;

PropTypes.Searchbar = {
    onSubmit: PropTypes.func.isRequired,
}