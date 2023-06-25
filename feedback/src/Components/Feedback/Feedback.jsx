import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Logo from '../../Assets/png/Logo.png'
import commit from '../../Assets/png/Commit.png'
import "../Styles.css"
import Modal from '@mui/material/Modal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'

const Feedback = () => {


    const [formDatas, setFormDatas] = useState({
        companyName: '',
        category: '',
        productLink: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatas((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { companyName, category, productLink, description } = formDatas;
        console.log(formDatas);
        let form = new FormData();
        form.append("image", formDatas.image);
        form.append("companyName", formDatas.companyName);
        form.append("category", formDatas.category);
        form.append("productLink", formDatas.productLink);
        form.append("description", formDatas.description);
        try {
            if (!companyName || !category || !productLink || !description) {
                alert("Kindly filled completely form");
            }
            else {

                await axios.post('http://localhost:8080/api/products', form,
                    { headers: { 'Content-Type': 'multipart/form-data' } });

                alert("Product add successfully");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }

        alert('Upload successful.');
        setOpen(false);
    };

    const imgHanlde = (e) => {
        setFormDatas({ ...formDatas, image: e.target.files[0] })
    }

    const filters = [
        { id: 1, name: 'All' },
        { id: 2, name: 'Fintech' },
        { id: 3, name: 'Edtech' },
        { id: 4, name: 'B2B' },
        { id: 5, name: 'Saas' },
        { id: 6, name: 'Agritech' },
        { id: 7, name: 'Medtech' },
    ];


    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Call the API in the useEffect hook
        axios.get('http://localhost:8080/api/AllProducts')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    var suggestion = 0;
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [openCommitBox, setOpenCommitBox] = React.useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            setOpen(true)
        } else {
            alert('User is not logged in');
        }
    };
    const handleClose = () => setOpen(false);
    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommitClick = (itemId) => {
        const inputText = comment;
        axios.put(`http://localhost:8080/api/products/${itemId}/comments`, { commit: inputText })
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getNumberOfProducts = () => {
        suggestion++;
    };
    return (
        <>
            <Box sx={{ px: { xs: "0.9rem", md: "5rem" } }}>
                {
                    console.log(products)
                }
                <Grid container>
                    <Grid item xs={12} md={2.5} sx={{ p: { xs: 0.5, md: 2 } }}>
                        <Box
                            sx={{
                                backgroundColor: "#36416A",
                                height: "8rem",
                                borderRadius: "1rem",
                                display: { xs: "none", sm: "flex" },
                                alignItems: "center",
                                justifyContent: "end",
                                flexDirection: "column",
                            }}>
                            <Box>
                                <Typography variant="h4" color="#fff">
                                    Feedback
                                </Typography>
                                <Typography variant="body1" color="#fff" my={0.4}>
                                    Apply Filter
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                borderRadius: "10px",
                                boxShadow: "2px 2px 6px 2px rgba(0, 0, 0, 0.15)",
                                minHeight: "140px",
                                p: 1.3,
                                mt: { xs: 0, sm: 2 },
                            }}
                        >
                            <Typography variant="body1" color="initial" fontWeight={600}>
                                Filter's:
                            </Typography>
                            <Box>
                                {filters.map((filter) => (
                                    <Typography
                                        key={filter.id}
                                        variant="body2"
                                        color="initial"
                                        sx={{
                                            backgroundColor: selectedFilter === filter.name ? '#36416A' : 'rgba(54, 65, 106, 0.15)',
                                            borderRadius: '30px',
                                            py: 0.5,
                                            px: 2,
                                            textAlign: 'center',
                                            display: 'inline-block',
                                            cursor: 'pointer',
                                            mr: 1,
                                            my: 1,
                                            color: selectedFilter === filter.name ? '#fff' : '#000',
                                        }}
                                        onClick={() => setSelectedFilter(filter.name)}
                                    >
                                        {filter.name}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9.5} sx={{ p: { xs: 0, sm: 2 }, mt: { xs: 2, md: 0 } }}>
                        <Box sx={{
                            width: "100%", border: "2px solid #36416A", p: { xs: 0.2, md: 1.2 }, borderRadius: '10px', px: 4,
                            display: "flex", justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <Typography variant="body1" color="initial" sx={{ fontWeight: { xs: 600, md: 800 }, fontSize: { xs: "0.7rem", md: "" } }}>Suggestions</Typography>
                            <Typography variant="body1" color="initial" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} sx={{ display: 'flex', alignItem: 'center', fontWeight: { xs: 600, md: 800 }, fontSize: { xs: "0.7rem", md: "" }, cursor: 'pointer' }}> <span style={{ color: "#8B8B8B", fontSize: "12px", fontWeight: 300 }}>Sort by:</span> Upvotes <ExpandMoreIcon /> </Typography>
                            <Typography variant="body1" color="initial"> </Typography>
                            <Button sx={{
                                backgroundColor: '#36416A', color: "#fff", px: { xs: 2, md: 4 }, py: 2,
                                fontSize: { xs: '0.8rem', md: "1.2rem" },
                                '&:hover': {
                                    backgroundColor: '#2A324F',
                                },
                            }} onClick={handleOpen}>+ Add product</Button>
                        </Box>
                        {/* Main  */}
                        <Box sx={{ minHeight: '80vh' }}>
                            {products
                                .filter((item) => selectedFilter === 'All' || item.category === selectedFilter)
                                .sort((a, b) => {
                                    if (sortOrder === 'asc') {
                                        return a.comments.length - b.comments.length;
                                    } else {
                                        return b.comments.length - a.comments.length;
                                    }
                                }).map((item) => (
                                    <Box
                                        key={item._id} // Assuming '_id' is the unique identifier for the product
                                        sx={{ backgroundColor: 'rgba(54, 65, 106, 0.15)', my: 2, display: 'flex', flexDirection: 'column', p: 2 }}
                                    >
                                        {getNumberOfProducts()}
                                        {console.log(suggestion)}
                                        <Box sx={{ width: '100%', display: 'flex' }}>
                                            <Box sx={{ width: '13%' }}>
                                                <img src={`http://localhost:8080/${item.image}`} alt="" className="Icon_image" />
                                            </Box>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography variant="h6" color="#36416A">
                                                        {item.companyName}
                                                    </Typography>
                                                    <Typography variant="body2" color="initial" sx={{ width: { xs: "60%", sm: "80%", md: '100%' } }}>
                                                        {item.description}
                                                    </Typography>
                                                    <Box display="flex" alignItems="center" mt={1}>
                                                        {/* {item.comments.map((filter) => ( */}
                                                        <Typography
                                                            // key={filter}
                                                            variant="body2"
                                                            color="initial"
                                                            sx={{
                                                                backgroundColor: '#C0CEFF',
                                                                borderRadius: '30px',
                                                                py: 0.5,
                                                                px: 2,
                                                                textAlign: 'center',
                                                                display: 'inline-block',
                                                                cursor: 'pointer',
                                                                mr: 1,
                                                                my: 1,
                                                            }}
                                                        >
                                                            {item.category}
                                                            {/* {filter} */}
                                                        </Typography>
                                                        {/* ))} */}

                                                        <Box sx={{ display: 'flex', cursor: 'pointer' }}>
                                                            <img
                                                                src={commit}
                                                                alt=""
                                                                style={{ width: "20px", height: "20px" }}
                                                                onClick={() => setOpenCommitBox(prevState => ({ ...prevState, [item._id]: !prevState[item._id] }))}
                                                            />
                                                            <span style={{ marginLeft: '5px' }} className="commit">Commit</span>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ width: '35px' }}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            width: 'auto',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            backgroundColor: '#C7CBD6',
                                                            p: 0.6,
                                                            borderRadius: '20px',
                                                        }}
                                                    >
                                                        <KeyboardArrowUpIcon />
                                                        <Typography variant="body2" color="initial" fontSize='14px'> 112</Typography>
                                                    </Box>
                                                    <Box >
                                                        <Box display="flex" mt={1} sx={{ textAlign: 'center' }}>
                                                            <span style={{ marginRight: '4px', fontSize: '14px' }}>{item.comments.length}</span>
                                                            <ChatBubbleIcon sx={{ width: "15px" }} />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        {/* Commit Box  */}

                                        {openCommitBox[item._id] ? (
                                            <Box sx={{ px: { xs: 0, md: 2 }, mt: 2 }}>
                                                <Box display='flex'>
                                                    <input type="text" placeholder="Add a comment...." className="input_field" value={comment} onChange={handleInputChange} />
                                                    <Button sx={{ backgroundColor: 'rgba(54, 65, 106, 0.15)', borderRadius: '30px', ml: { xs: 0, md: 2 }, fontSize: '14px' }}
                                                        onClick={() => { handleCommitClick(item._id) }}>commit</Button>
                                                </Box>
                                                <Box sx={{ height: "150px", overflowY: 'scroll', p: 1 }}>
                                                    <ol>
                                                        {item.comments.map((comment, index) => (
                                                            <li key={index}>{comment}</li>
                                                        ))}
                                                    </ol>
                                                </Box>
                                            </Box>
                                        ) : null}
                                    </Box>
                                ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: 300, md: 600 },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    height: "70vh"
                }}>
                    <Grid container spacing={0} >
                        {/* Left  */}
                        <Grid item xs={12} md={6} sx={{ height: "70vh", display: 'flex', alignItems: 'center', justifyContent: "center", px: 2, flexDirection: 'column' }}>
                            <Box sx={{ px: 2 }}>
                                <Typography variant="h5" color="initial" fontWeight={600} mb={3}>Log in to continue</Typography>
                                <input type="text" className="Login_Input" placeholder="Name of the company" name="companyName" value={formDatas.companyName} onChange={handleChange} />
                                <input type="text" className="Login_Input" placeholder="Category" name="category" value={formDatas.category} onChange={handleChange} />
                                <input type="text" className="Login_Input" placeholder="Link of product" name="productLink" value={formDatas.productLink} onChange={handleChange} />
                                <input type="text" className="Login_Input" placeholder="Add description" name="description" value={formDatas.description} onChange={handleChange} />
                                <input type="file" className="Login_Input" placeholder="Add logo url" name="image" onChange={imgHanlde} />
                                <Button sx={{
                                    fontSize: "0.8rem", mt: 1.2, py: 2, px: 4, backgroundColor: '#36416A', borderRadius: '30px', color: '#fff', '&:hover': {
                                        backgroundColor: '#36416A',
                                    }
                                }} onClick={handleSubmit}>+ Add</Button>
                            </Box>
                        </Grid>
                        {/* Right  */}
                        <Grid item xs={0} md={6} sx={{ backgroundColor: "#36416A", color: "#fff", p: 2, height: "70vh", display: { xs: 'none', md: 'flex' }, flexDirection: "column" }}>
                            <Typography variant="h4" mt={6} fontWeight={600}>Feedback</Typography>
                            <Typography variant="h6" mt={3} width="150px" >
                                Add your product and rate other items.........
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default Feedback;



