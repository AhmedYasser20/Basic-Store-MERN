import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast } from "@chakra-ui/react";
import { use } from "react";
import { useState } from "react";
import { useProductStore } from "../state/product.js"
const CreatePage = () => {
    const [Product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const { createProduct } = useProductStore();

    const Toast = useToast()
    const handleAddProduct = async () => {
        const { success, message } = await createProduct(Product);
        if (!success) {
            Toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            Toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        setNewProduct({ name: "", price: "", image: "" });
    };
    return (
        <Container maxW={"container.sm"}>
            <VStack>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Create New Product</Heading>

                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.900")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4}>
                        {/* The ...newProduct syntax is the spread operator, which creates a shallow copy of 
                    the newProduct object and then updates the name property with the new value from the input field. */}
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={Product.name}
                            onChange={(e) => setProduct({ ...Product, name: e.target.value })}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={Product.price}
                            onChange={(e) => setProduct({ ...Product, price: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={Product.image}
                            onChange={(e) => setProduct({ ...Product, image: e.target.value })}
                        />
                        <Button colorScheme={"blue"} onClick={handleAddProduct} w='full'>
                            Create Product
                        </Button>
                    </VStack>

                </Box>

            </VStack>
        </Container>
    );
}

export default CreatePage;