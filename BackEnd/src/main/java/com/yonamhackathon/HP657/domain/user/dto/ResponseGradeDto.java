package com.yonamhackathon.HP657.domain.user.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ResponseGradeDto {
    private Double grade;
    private long count;
}
