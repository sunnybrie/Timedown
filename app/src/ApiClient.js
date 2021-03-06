//Task Requests
export const getTasks = async (user) => {
  const response = await fetch(
    `/api/tasks?userId=${encodeURIComponent(user)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.json();
};

export const addTask = async (
  userId,
  dueDate,
  estTimeHours,
  estTimeMinutes,
  summary,
  description,
) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      dueDate,
      estTimeHours,
      estTimeMinutes,
      summary,
      description,
    }),
  });

  return getTasks(userId);
};

export const deleteTask = async (id) => {
  const response = await fetch(`/api/tasks/?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

//User Account Requests
export const getUser = async (email) => {
  const response = await fetch(
    `/api/user/?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.json();
};

export const addUser = async (email, name) => {
  const response = await fetch(
    `/api/user/?email=${encodeURIComponent(email)}&name=${encodeURIComponent(
      name,
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.json();
};

export const updateSettings = async (id, userSettings) => {
  const response = await fetch(
    `/api/user/settings/?userId=${encodeURIComponent(id)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userSettings }),
    },
  );

  return response.json();
};

//TimeBlock Requests
