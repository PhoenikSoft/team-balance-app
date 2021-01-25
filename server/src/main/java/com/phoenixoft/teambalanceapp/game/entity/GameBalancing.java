package com.phoenixoft.teambalanceapp.game.entity;

import com.vladmihalcea.hibernate.type.array.ListArrayType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_game_balancing")
@Data
@ToString(exclude = {"balancedTeams"})
@EqualsAndHashCode(exclude = {"balancedTeams"})
@TypeDef(
        name = "list-array",
        typeClass = ListArrayType.class
)
public class GameBalancing implements Serializable {

    @Id
    @Column(name = "game_id")
    private Long gameId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "game_id")
    private Game game;

    @Type(type = "com.vladmihalcea.hibernate.type.json.JsonBinaryType")
    @Column(name = "balanced_teams", columnDefinition = "jsonb")
    @Basic(fetch = FetchType.LAZY)
    private BalancedTeams balancedTeams;

    @Type(type = "list-array")
    @Column(
            name = "used_balancing",
            columnDefinition = "integer[]"
    )
    private List<Integer> usedBalancing = new ArrayList<>();

    public void resetBalancing() {
        balancedTeams = null;
        usedBalancing = null;
    }
}
