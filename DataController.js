class DataController {
  dataUsers = [];
  dataCategories = [
    {
      category: "Телефоны",
      items: [
        { name: "iPhone 15 Pro", price: 99999, quantity: 5, inStock: true },
        { name: "Samsung Galaxy S24", price: 89999, quantity: 3, inStock: true },
        { name: "Xiaomi 14", price: 49999, quantity: 0, inStock: false },
      ],
    },
    {
      category: "Аксесуары",
      items: [
        { name: "Чехол для телефона", price: 999, quantity: 20, inStock: true },
        { name: "Зарядное устройство", price: 1999, quantity: 15, inStock: true },
        { name: "Наушники Bluetooth", price: 4999, quantity: 0, inStock: false },
      ],
    },
    {
      category: "Планшеты",
      items: [
        { name: "iPad Pro", price: 129999, quantity: 2, inStock: true },
        { name: "Samsung Galaxy Tab", price: 59999, quantity: 4, inStock: true },
        { name: "Lenovo Tab", price: 29999, quantity: 0, inStock: false },
      ],
    },
    {
      category: "Smart-часы",
      items: [
        { name: "Apple Watch Series 9", price: 39999, quantity: 8, inStock: true },
        { name: "Samsung Galaxy Watch", price: 29999, quantity: 6, inStock: true },
        { name: "Xiaomi Mi Band", price: 4999, quantity: 0, inStock: false },
      ],
    },
  ];

  async createClient(req, res) {
    try {
      const data = req.body;
      const { login, password } = data;
      console.log(data, "data");
      if (login && password) {
        const isSome = this.dataUsers.some((user) => user.login === login);
        if (isSome) {
          throw new Error("Такой пользователь уже существует");
        }

        if (login.length > 5 && password.length > 5) {
          setTimeout(() => {
            data.access_token =
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
            this.dataUsers.push(data);

            return res.json({ message: "Успешно зарегистрирован", data });
          }, 2000);
        } else {
          throw new Error("Данные не соответсвуют валидации");
        }
      } else {
        throw new Error("Отсутствуют обязательные поля");
      }
    } catch (e) {
      console.log(e);
      const message = e.message;

      if (
        message === "Отсутствуют обязательные поля" ||
        message === "Данные не соответсвуют валидации" ||
        message === "Такой пользователь уже существует"
      ) {
        res.status(400).json({ message });
      } else {
        res.status(500).json({ message });
      }
    }
  }

  async login(req, res) {
    try {
      if (!this.dataUsers.length) {
        throw new Error("Такой пользователь не зарегистрирован");
      } else {
        const data = req.body;
        const { login, password } = data;
        const user = this.dataUsers.filter((user) => user.login === login)[0];
        if (user) {
          if (user.password === password) {
            setTimeout(() => {
              data.access_token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
              return res.json({
                message: "Успешно авторизован",
                data: {
                  login: user.login,
                  email: user.email,
                  phone: user.phone,
                },
              });
            }, 2000);
          } else {
            throw new Error("Не верный пароль");
          }
        } else {
          throw new Error("Не верный логин");
        }
      }
    } catch (e) {
      const message = e.message;

      if (
        message === "Такой пользователь не зарегистрирован" ||
        message === "Не верный пароль" ||
        message === "Не верный логин"
      ) {
        res.status(400).json({ message });
        //         new Promise((resolve) => {
        //   resolve.status(400).json({ message });
        // });
      } else {
        res.status(500).json({ message });
      }
    }
  }

  async checkLogin(req, res) {
    try {
      if (req.query) {
        const { login } = req.query;
        const isSome = this.dataUsers.some((user) => user.login === login);

        setTimeout(() => {
          const data = { result: isSome };
          return res.json(data);
        }, 2000);
      }
    } catch (e) {
      res.status(500).json({ message });
    }
  }

  async editProfile(req, res) {
    try {
      const data = req.body;
      const { login } = data;
      console.log(this.dataUsers);
      this.dataUsers = this.dataUsers.map((user) => {
        if (user.login === login) {
          user = data;
        }
        return user;
      });
      setTimeout(() => {
        return res.json({ message: "Успешно изменен" });
      }, 2000);
    } catch (e) {
      res.status(500).json({ message });
    }
  }

  async getCategories(req, res) {
    try {
      setTimeout(() => {
        return res.json({ categories: this.dataCategories });
      }, 2000);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default DataController;
