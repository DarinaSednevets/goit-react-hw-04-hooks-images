import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ pictures, bigImage }) => {
    return (
        <ul className={styles.ImageGallery}>
            {pictures.map(({ id, webformatURL, largeImageURL }) => {
                const handleItemClick = (() => bigImage(largeImageURL, webformatURL));
                return (
                    <ImageGalleryItem
                        key={id}
                        image={webformatURL}
                        onClick={handleItemClick}
                    />
                )
            })}
        </ul>
    )
}
export default ImageGallery;