package com.yonamhackathon.HP657.domain.user.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ResponseGpaDto {
    private Double gpa;
    private long count;
}
