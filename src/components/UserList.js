import React, {
  useState,
  useEffect
} from 'react';
import axios from 'axios';
import SpecialTable from './SpecialTable';
import Pagination from './Pagination';
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';
import DeleteUsersForm from './DeleteUsersForm';
import {
  Button,
} from 'react-bootstrap';

Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const shortMonth = (date) => {
  return Date.shortMonths[date.getMonth()];
}

const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


function UserList() {

  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const [usersPerPage] = useState(3);
  const [showAddUser, setShowAddUser] = useState(false);
  const [userIdsToDelete, setUserIdsToDelete] = useState([]);

  const handleCloseAddUser = () => {
    setShowAddUser(false);
  };
  const handleShowAddUser = () => {
    setShowAddUser(true);
  };

  const handleCloseUpdateUser = () => {
    setUser(null);
  };
  const handleShowUpdateUser = (user) => {
    setUser(user);
  }

  const handleCloseDeleteUsers = () => {
    setUserIdsToDelete([]);
  };
  const handleShowDeleteUsers = () => {
    const ids = document.getElementsByName('id');
    let values = [];
    for (var i = 0; i < ids.length; i++) {
      if (ids[i].checked) {
        values.push(userList[i]);
      }
    }
    console.log(values);
    setUserIdsToDelete(values);
  };

  useEffect(() => {
    axios.get('http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json', {
        headers: {
          Authorization: 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM=',
        },
      }).then(response => {
        setUserList(response.data.items);
      })
      .catch(error => {
        console.log('error fetching and parsing data', error);
      })
  }, []);
  console.log(userList);


  const users = userList.map((user, index) => {
    let createdDate = new Date(user.datecreated);
    let modifiedDate = new Date(user.datemodified);

    let userFullName = user.namefirst + " " + user.namelast;
    let createdDateMonth = shortMonth(createdDate);
    let createdDateTime = formatAMPM(createdDate);

    let modifiedDateMonth = shortMonth(modifiedDate);
    let modifiedDateTime = formatAMPM(modifiedDate);
    return [ 
      <input type="checkbox" name="id" value={index}/>,
      userFullName,
      user.email,
      `${createdDate.getDate()} ${createdDateMonth}, ${createdDateTime} (${createdDate.getFullYear()})`,
      `${modifiedDate.getDate()} ${modifiedDateMonth}, ${modifiedDateTime} (${modifiedDate.getFullYear()})`, 
      <Button className="button" variant="primary" onClick={() => handleShowUpdateUser(user)} >
        Update User 
      </Button>
    ];
  });


  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  //const [showDeleteUsers, setShowDeleteUsers] = useState(false);



  return ( 
    <div className="table-responsive">
      <SpecialTable
        data={{
          headings: ['', 'Name', 'Email', 'Created At', 'Modified At', ''],
          values: currentUsers,
        }}
      />
    
      <Button  className="button" variant="primary" onClick={handleShowAddUser}>
        Add User
      </Button>
      <Button className="button" variant="danger" onClick={handleShowDeleteUsers}>
        Delete Selected
      </Button>
  
 
      <AddUserForm show={showAddUser} close={handleCloseAddUser}/>
      <UpdateUserForm user={user} close={handleCloseUpdateUser}/>
      <DeleteUsersForm users={userIdsToDelete} close={handleCloseDeleteUsers}/>

      <Pagination
        postsPerPage={usersPerPage}
        totalPosts={users.length}
        paginate={paginate}
      />
   </div>
 );
}


export default UserList;
