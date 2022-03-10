
import { Link } from 'react-router-dom';
import Navigation from '../ui/navigation';
import Footer from '../ui/footer';

const Home=(props)=>{
	return (
		<>
		<Navigation> <h1 style={{color:"#009DDC",margin:"50px"}}>HOME</h1></Navigation>
		<Footer></Footer>
		</>
	);
}

export default Home;
