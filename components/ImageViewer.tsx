import { Image } from "expo-image";


export default function ImageViewer({
    placeholderImageSource, selectedImage
}: {
    placeholderImageSource: any;
    selectedImage: string | null;
}) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;
  
    return (
        <Image source={imageSource} style={selectedImage? styles.image : styles.placeholder } contentFit="contain"/>
    );
  }

const styles = {
    placeholder: {
        flex: 1,
        width: 500,
        // height: 'calc(100% - 20px)',
        objectFit: 'fit',
        borderWidth: 1,
        borderRadius: 10
    },
    image: {
        flex: 1,
        width: 350,
        
        borderRadius: 10,
    },
};