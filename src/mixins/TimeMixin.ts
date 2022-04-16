import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            getTotalTimeSpentByCol: "getTotalTimeSpent",
        }),
        totalTimeSpent(): Record<string, number> {
            const totalMinutes = this.getTotalTimeSpentByCol(this.list.id ?? this.item.column_id);
            const roundedHours = this.getHours(totalMinutes);
            const roundedMinutes = this.getRemainingMinutes(totalMinutes);
            return { hours: roundedHours, minutes: roundedMinutes };
        },
    },
    methods: {
        getHours(minutes: number): number {
            return Math.floor(minutes / 60);
        },
        getRemainingMinutes(minutes: number): number {
            const hours = (minutes / 60);
            const roundedHours = this.getHours(minutes);

            return Math.round((hours - roundedHours) * 60);
        },
        getTotalMinutes(fullTime: string): number {
            return (
                parseInt(fullTime.split(":")[0]) * 60 +
                parseInt(fullTime.split(":")[1])
            );
        },
    }
};