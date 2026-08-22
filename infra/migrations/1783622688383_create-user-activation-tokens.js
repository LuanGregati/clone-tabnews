exports.up = (pgm) => {
  pgm.createTable("user_activation_tokens", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    used_at: {
      type: "timestamptz",
      notNull: false,
    },
    user_id: {
      type: "uuid",
      notNull: true,
    },
    expires_at: {
      type: "timestamptz",
      notNull: false,
    },
    created_at: {
      // Why timestamptz (with timezone)? https://justatheory.com/2012/04/postgres-use-timestamptz/
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      // Generally, updated_at receives the same value as created_at when a new record is inserted
      default: pgm.func("timezone('utc', now())"),
    },
  });
};

exports.down = false;
