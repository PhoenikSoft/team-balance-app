GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO postgres;

-- Users table
create sequence user_seq increment by 1;

alter sequence user_seq owner to postgres;

create table tbl_user
(
    id bigint default nextval('user_seq'::regclass) not null
        constraint user_pk
            primary key,
    first_name varchar(255),
    last_name  varchar(255),
    email varchar(255),
    password  varchar(255),
    phone      varchar(255),
    rating     numeric(19, 2)
);

alter table tbl_user owner to postgres;

-- Roles table
create sequence role_seq increment by 1;

alter sequence role_seq owner to postgres;

create table tbl_role
(
    id bigint default nextval('role_seq'::regclass) not null
        constraint role_pk
            primary key,
    name varchar(255)
);

alter table tbl_role owner to postgres;

create table tbl_user_roles
(
    user_id bigint not null
        constraint user_fk
            references tbl_user,
    role_id bigint not null
        constraint role_fk
            references tbl_role
);

alter table tbl_user_roles owner to postgres;

-- Groups table
create sequence group_seq increment by 1;

alter sequence group_seq owner to postgres;

create table tbl_group
(
    id bigint default nextval('group_seq'::regclass) not null
        constraint group_pk
            primary key,
    name     varchar(255)
);

alter table tbl_group owner to postgres;

create table tbl_group_users
(
    group_id bigint not null
        constraint group_fk
            references tbl_group,
    user_id  bigint not null
        constraint user_fk
            references tbl_user
);

alter table tbl_group_users owner to postgres;

-- Password Reset Token table
create sequence password_reset_token_seq increment by 1;

alter sequence password_reset_token_seq owner to postgres;

create table tbl_password_reset_token
(
    id bigint default nextval('password_reset_token_seq'::regclass) not null
        constraint password_reset_token_pk
            primary key,
    token     varchar(255),
    expiry_date timestamp,
    user_id  bigint not null
        constraint user_fk
            references tbl_user
);
