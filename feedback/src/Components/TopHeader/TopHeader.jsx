import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import image from '../../Assets/png/HomeImg.png'
import "../Styles.css"

const TopHeader = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ height: { xs: '60vh', md: '80vh'} }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={6} sx={{ height: { xs: '40vh', md: '80vh'}, display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                            <img src={image} alt="" className="image"/>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ height: { xs: '20vh', md: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column' } }}>
                            <Typography variant="h4" color="initial" sx={{lineHeight: {xs:" ",md:"50px"}, fontSize:{xs:'1.5rem',sm:"2.5rem"}, fontWeight:"600"}} >Add your products and give your valuable feedback</Typography>
                            <Typography variant="body2" color="#6A6A6A" sx={{mt:{xs:"20px",md:"10px"}}}>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default TopHeader