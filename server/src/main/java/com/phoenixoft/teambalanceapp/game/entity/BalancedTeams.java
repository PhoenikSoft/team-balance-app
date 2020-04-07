package com.phoenixoft.teambalanceapp.game.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BalancedTeams implements Serializable {

    private List<Team> teams;
}
