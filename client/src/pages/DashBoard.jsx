import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import GoalForm from '../components/GoalForm';
import { getGoals , reset} from '../features/goals/goalSlice';
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem';

function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // store has info abt currently logged in user
  const {user} = useSelector((state)=> state.auth); 
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals);

  // unless we have the user in the localstorage, we 
  // dont want to access the dashboard, so we are always
  // redirected to the '/login' page
  useEffect(()=>{
    

    // if we havent loggin in, redirect to login page
    if( !user)
      navigate('/login');
    // else, dispatch the getGoals() to display all the doals
    else
      dispatch(getGoals());

    if( isError)
    console.log(message);


    // when unmounting
    return ()=>[
      dispatch(reset())
    ]

  }, [user, navigate, dispatch, isError, message]);


  if( isLoading)
    return <Spinner/>

  return (
    <div className='dashboard'>
      <section className='heading'>
        <h1>Welcome {user?.name }</h1>
        <p>Goals DashBoard</p>
      </section>
      <GoalForm/>
      <section className="content">
        {goals.length?(
            <div className="goals">
              {goals.map((goal)=>(
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ):(
            <h3>Set your Goals first !</h3>
          )}
      </section>
    </div>
  )
}

export default DashBoard