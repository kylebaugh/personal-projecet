import axios from 'axios'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {setUser} from '../redux/authReducer'
import AdminList from './AdminList'
import LearnList from './LearnList'
import Dropzone from 'react-dropzone'
import {GridLoader} from 'react-spinners'
import {useDispatch} from 'react-redux'
import {v4 as randomString} from 'uuid'
import {useHistory} from 'react-router-dom'


const Profile = (props) => {
    const {user} = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()
    const {push} = useHistory()

    const [userItems, setUserItems] = useState([])
    const [learnCount, setLearnCount] = useState([])
    const [showDropzone, setShowDropzone] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [url, setUrl] = useState('')
    // const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`


    useEffect(() => {
        axios.get(`/topics/userItems/${user.user_id}`)
            .then((res) => {
                setUserItems(res.data)
                // setUrl(user.picture)
            })
            .catch(err => {
                console.log(err)
                console.log('Use effect failed')
            })
        }, [user.user_id, user])

    useEffect(()=>{
        axios.get(`/topics/learnList/${user.user_id}`)
        .then((res) => {
            setLearnCount(res.data)
        })
        .catch(err => {
            console.log(err)
            console.log('Use effect failed')
        })
    }, [])
    

    const toggleDropzone = () => {
        setShowDropzone(!showDropzone)
        setUrl('')
    }

    const getSignedRequest = ([file]) => {
        setIsUploading(true);
        // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
    
        // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
        axios
          .get('/api/signs3', {
            params: {
              'file-name': fileName,
              'file-type': file.type,
            },
          })
          .then(response => {
            const { signedRequest, url } = response.data;
            uploadFile(file, signedRequest, url);
          })
          .catch(err => {
            console.log(err)
            console.log('profile get s3 failed')
            console.log(fileName);
            console.log(file.type);
          });
      };
    
    const uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios
          .put(signedRequest, file, options)
          .then(response => {
            setIsUploading(false);
            setUrl(url)
            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
          })
          .catch(err => {
            setIsUploading(false);
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };
    
        
    const changeImage = (user) => {
        axios.put(`/profile/changePic`, {picture: url+''})
            .then((res) => {
                console.log('yay')
                console.log(res.data)
                dispatch(setUser(res.data))
                setUrl('')
                setShowDropzone(!showDropzone)
                // window.location.reload()
            })
            .catch(err => {
                console.log(err)
                console.log('changeImage failed')
            })
    }

    const handlePrint = () => {
      push('/learnMore')
    }

    return(
        <div className='border'>
            <div className='homeBorder'></div>
            <div className='profilePage'>
                <h1>{user.firstname}'s Profile</h1>
                <div className='profileDivider'></div>
                <div className='profileDiv'>

                    <div className='profilePagePic'>
                        <img className='profilePic' src={user.picture} alt='User Profile Pic'/>
                        {!showDropzone && <button className='changeProfile' onClick={() => {toggleDropzone()}}>Change Profile Picture</button>}
                        {showDropzone && <div className='changeProfileButtons'>
                        <button onClick={() => {toggleDropzone()}}>Cancel</button>
                        {/* <button onClick={() => {changeImage()}}>Submit</button> */}
                        </div>}
                        {url && <p className='uploaded'>Image Uploaded!</p>}
                        {url && <button className='uploadSubmit' onClick={() => {changeImage()}}>Submit</button>}
                        
                        {showDropzone && 
                            <Dropzone
                                onDropAccepted={getSignedRequest}
                                accept="image/*"
                                multiple={false}>
                                {({getRootProps, getInputProps}) => (
                                <div className='dropzone'
                                    {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
                                </div>
                                )}
                            </Dropzone>
                        }
                        
                        {user && user.is_admin && <section className='profileDetails'>
                            <p>Account Type: Administrator</p>
                            <p>Items Created: {userItems.length}</p>
                        </section>}
                        {user && !user.is_admin && <section className='profileDetails'> 
                            <p>Account Type: User</p>
                            <p>Items Saved: {learnCount.length}</p>
                        </section>}
                    </div>
                    
                    <div style={{display:'flex', flexDirection:'column'}}>
                        {user.is_admin && <div>
                            <AdminList />
                        </div>}
                        {!user.is_admin && <div>
                            <LearnList />
                            </div>}
                        {!user.is_admin && <button className='printButton' onClick={handlePrint}>Print Flashcards</button>}
                    </div>
                </div>
                
            </div>

            <div className='homeBorder'></div>
        </div>
    )
}

export default Profile