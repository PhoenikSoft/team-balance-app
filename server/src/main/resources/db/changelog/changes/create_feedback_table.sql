create sequence feedback_seq increment by 1;
alter sequence feedback_seq owner to postgres;

create table tbl_feedbacks
(
	id bigint default nextval('feedback_seq'::regclass) not null
		constraint feedback_pk primary key,
	message varchar(500),
    created timestamp,
    created_by_id bigint not null
        constraint user_fk
            references tbl_user
);
alter table tbl_feedbacks owner to postgres;
