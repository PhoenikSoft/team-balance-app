insert into public.tbl_user (first_name, last_name, email, password, phone, rating) values ('andriy', 'kuz', 'andriy@q.w', '$2a$10$1BH8csMmXoWQgrpuS56kKO06J7j8cL1QaWDYvB1/i6EmFPX9YL5NS', '+9009', 8.00);
insert into public.tbl_user (first_name, last_name, email, password, phone, rating) values ('eugen', 'kari', 'eugen@q.w', '$2a$10$x2h2PozS7s0IU8Wrmp4OxuqsPeSRfmCAmL3tpHfLPyeb19lLbErq2', '+9999', 7.00);

insert into public.tbl_group (name) values ('io22');

insert into public.tbl_group_users (group_id, user_id) values (1, 1);
insert into public.tbl_group_users (group_id, user_id) values (1, 2);

insert into public.tbl_role (name) values ('ADMIN_ROLE_1');
insert into public.tbl_role (name) values ('USER_ROLE_1');

insert into public.tbl_user_roles (user_id, role_id) values (1, 1);
insert into public.tbl_user_roles (user_id, role_id) values (1, 2);
insert into public.tbl_user_roles (user_id, role_id) values (2, 2);

