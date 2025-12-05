import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body1">
            © 2024 Tech Store - Todos los derechos reservados
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink href="#" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <GitHub /> GitHub
            </MuiLink>
            <MuiLink href="#" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LinkedIn /> LinkedIn
            </MuiLink>
            <MuiLink href="#" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Email /> Contacto
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;