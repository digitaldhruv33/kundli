export default () => ({
    database: {
      dialect: "postgresql",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      dbName: "vama",
      sync: true,
      forceSync: false,
    },
});