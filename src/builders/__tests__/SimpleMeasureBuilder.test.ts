import "jest";
import { AFM } from "@gooddata/typings";

import { SimpleMeasureBuilder } from "../SimpleMeasureBuilder";

describe("SimpleMeasureBuilder", () => {
    it("creates a simple measure", () => {
        const actual = SimpleMeasureBuilder("foo").build();
        const expected: AFM.ISimpleMeasureDefinition = {
            measure: {
                aggregation: undefined,
                computeRatio: false,
                filters: [],
                item: {
                    identifier: "foo",
                },
            },
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with aggregation", () => {
        const actual = SimpleMeasureBuilder("foo")
            .withAggregation("avg")
            .build();
        const expected: AFM.ISimpleMeasureDefinition = {
            measure: {
                aggregation: "avg",
                computeRatio: false,
                filters: [],
                item: {
                    identifier: "foo",
                },
            },
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with positive attribute filter", () => {
        const actual = SimpleMeasureBuilder("foo")
            .withPositiveAttributeFilter("displayForm", ["bar", "baz"])
            .build();
        const expected: AFM.ISimpleMeasureDefinition = {
            measure: {
                aggregation: undefined,
                computeRatio: false,
                filters: [
                    {
                        positiveAttributeFilter: {
                            displayForm: {
                                identifier: "displayForm",
                            },
                            in: ["bar", "baz"],
                        },
                    },
                ],
                item: {
                    identifier: "foo",
                },
            },
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with negative attribute filter", () => {
        const actual = SimpleMeasureBuilder("foo")
            .withNegativeAttributeFilter("displayForm", ["bar", "baz"])
            .build();
        const expected: AFM.ISimpleMeasureDefinition = {
            measure: {
                aggregation: undefined,
                computeRatio: false,
                filters: [
                    {
                        negativeAttributeFilter: {
                            displayForm: {
                                identifier: "displayForm",
                            },
                            notIn: ["bar", "baz"],
                        },
                    },
                ],
                item: {
                    identifier: "foo",
                },
            },
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with absolute date filter", () => {
        const actual = SimpleMeasureBuilder("foo")
            .withAbsoluteDateFilter("displayForm", "2018-10-01", "2018-10-31")
            .build();
        const expected: AFM.ISimpleMeasureDefinition = {
            measure: {
                aggregation: undefined,
                computeRatio: false,
                filters: [
                    {
                        absoluteDateFilter: {
                            dataSet: {
                                identifier: "displayForm",
                            },
                            from: "2018-10-01",
                            to: "2018-10-31",
                        },
                    },
                ],
                item: {
                    identifier: "foo",
                },
            },
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with relative date filter", () => {
        const actual = SimpleMeasureBuilder("foo")
            .withRelativeDateFilter("displayForm", "granularity", 1, 3)
            .build();
        const expected: AFM.ISimpleMeasureDefinition = {
            measure: {
                aggregation: undefined,
                computeRatio: false,
                filters: [
                    {
                        relativeDateFilter: {
                            dataSet: {
                                identifier: "displayForm",
                            },
                            granularity: "granularity",
                            from: 1,
                            to: 3,
                        },
                    },
                ],
                item: {
                    identifier: "foo",
                },
            },
        };
        expect(actual).toEqual(expected);
    });
    it("creates a complex measure", () => {
        const actual = SimpleMeasureBuilder("foo")
            .withAggregation("count")
            .withRelativeDateFilter("displayForm", "granularity", 1, 3)
            .asRatio()
            .build();
        const expected: AFM.ISimpleMeasureDefinition = {
            measure: {
                aggregation: "count",
                computeRatio: true,
                filters: [
                    {
                        relativeDateFilter: {
                            dataSet: {
                                identifier: "displayForm",
                            },
                            granularity: "granularity",
                            from: 1,
                            to: 3,
                        },
                    },
                ],
                item: {
                    identifier: "foo",
                },
            },
        };
        expect(actual).toEqual(expected);
    });
});
