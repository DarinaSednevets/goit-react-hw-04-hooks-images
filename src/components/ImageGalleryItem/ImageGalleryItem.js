
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ image, onClick }) => {
    return (
        <li className={styles.ImageGalleryItem}>
            <img
                src={image}
                alt=""
                className={styles.image}
                onClick={onClick} />
        </li>
    )
}
export default ImageGalleryItem;