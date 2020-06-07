-- Users table
create sequence user_votes_seq increment by 1;
alter sequence user_votes_seq owner to postgres;

create table tbl_user_votes
(
    id bigint default nextval('user_votes_seq'::regclass) not null
        constraint user_vote_pk
            primary key,
    for_user_id bigint not null
        constraint for_user_fk
            references tbl_user,
    voter_id bigint not null
        constraint voter_fk
            references tbl_user,
    game_id bigint not null
        constraint game_fk
            references tbl_game,
    vote smallint not null,
    created timestamp,
    CONSTRAINT unique_vote UNIQUE(for_user_id,voter_id,game_id)
);

alter table tbl_user_votes owner to postgres;
