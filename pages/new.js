import StadiumForm from '../components/StadiumForm';

const NewStadium = () => {
  const stadiumForm = {
    name: '',
    longitude: '',
    latitude: '',
    city: '',
    country: '',
    constructionStart: '',
    visitedDate: '',
    opening: '',
    costs: '',
    capacity: '',
    avatar: '',
  };

  return <StadiumForm formId="add-pet-form" stadiumForm={stadiumForm} />;
};

export default NewStadium;
