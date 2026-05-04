package com.dmgdev.pokehub.spawn.model;

public enum GenerationRange {

    GEN_1(1, 1, 151),
    GEN_2(2, 152, 251),
    GEN_3(3, 252, 386),
    GEN_4(4, 387, 493),
    GEN_5(5, 494, 649),
    GEN_6(6, 650, 721),
    GEN_7(7, 722, 809),
    GEN_8(8, 810, 905),
    GEN_9(9, 906, 1025);

    private final int generation;
    private final int startId;
    private final int endId;

    GenerationRange(int generation, int startId, int endId) {
        this.generation = generation;
        this.startId = startId;
        this.endId = endId;
    }

    public int getGeneration() {
        return generation;
    }

    public int getStartId() {
        return startId;
    }

    public int getEndId() {
        return endId;
    }

    public static GenerationRange fromGeneration(int generation) {
        for (GenerationRange range : values()) {
            if (range.generation == generation) {
                return range;
            }
        }

        return GEN_1;
    }
}