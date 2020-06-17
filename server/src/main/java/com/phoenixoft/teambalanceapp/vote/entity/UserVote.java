package com.phoenixoft.teambalanceapp.vote.entity;

import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_user_votes")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserVote {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_vote_gen")
    @SequenceGenerator(name = "user_vote_gen", sequenceName = "user_votes_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "for_user_id")
    private User forUser;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "voter_id")
    private User voter;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "game_id")
    private Game game;

    private int vote;

    @Column
    @CreationTimestamp
    private LocalDateTime created;
}
