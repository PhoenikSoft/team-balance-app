create sequence game_seq increment by 1;
alter sequence game_seq owner to postgres;

create table tbl_game
(
	id bigint default nextval('game_seq'::regclass) not null
		constraint game_pk primary key,
	name varchar(255),
    start_timestamp timestamp,
    group_id bigint not null
        constraint group_fk
            references tbl_group
);
alter table tbl_game owner to postgres;

create table tbl_game_players
(
	game_id bigint not null
		constraint game_fk
			references tbl_game,
	player_id bigint not null
		constraint user_fk
			references tbl_user
);
alter table tbl_game_players owner to postgres;
