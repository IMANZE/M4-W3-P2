window.onload = async () => {
  try {
    let dataUsers = await fetchUsers();
    //  console.log(dataUsers);
    addUserList(dataUsers);
  } catch (error) {
    console.log(error);
  }
};

const fetchUsers = async () => {
  let fetchUsersResult = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  let dataUsers = await fetchUsersResult.json();

  return dataUsers;
};

const search = async () => {
  addUserList(await filterUsers());
};

const filterUsers = async () => {
  let inputSearch = document.querySelector("input").value;
  let dropdownSearch = document.querySelector("#inputSearchSelector").value;

  let usersArray = await fetchUsers();

  if (inputSearch && dropdownSearch === "name") {
    return usersArray.filter((user) => user.name.includes(inputSearch));
  } else if (inputSearch && dropdownSearch === "username") {
    return usersArray.filter((user) => user.username.includes(inputSearch));
  } else if (inputSearch && dropdownSearch === "email") {
    return usersArray.filter((user) => user.email.includes(inputSearch));
  } else {
    return usersArray;
  }
};

const addUserList = (usersArray) => {
  const usersTable = document.querySelector("#nameEmailList");
  console.log(usersTable);

  usersTable.innerHTML = usersArray
    .map((user) => {
      return `
    <tbody>
      <tr>
        <th scope="row">${user.id}</th>
        <td scope="row">${user.name}</td>
        <td scope="row">${user.username}</td>
        <td scope="row">${user.email}</td>
       </tr>
    </tbody>
  `;
    })
    .join(" ");
};


