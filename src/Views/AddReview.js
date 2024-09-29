import AddReviewForm from "../Components/Forms/AddReviewForm";
import '../assests/scss/addReview.scss'
function AddReview() {
    return (
        <div>
            <h1 className='text-3xl text-center font-semibold mb-4'>Add review</h1>
            <AddReviewForm/>
        </div>
    );

}

export default AddReview;