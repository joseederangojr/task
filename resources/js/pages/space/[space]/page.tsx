import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AppLayout } from "@/layouts/app-layout";
import { PageProps, Space, Column, Task, User } from "@/types";
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
} from "@dnd-kit/core";
import { router } from "@inertiajs/react";
import { TaskItem } from "./components/task-item";
import { TaskList } from "./components/task-list";
import { DraggableTaskItem } from "./components/draggable-task-item";
import { DroppableTaskItem } from "./components/droppable-task-item";

type Props = {
	space: Space;
	team: User[];
};

export default function SpaceByIdPage(props: PageProps<Props>) {
	const [activeTask, setActiveTask] = React.useState<Task | null>(null);
	const handleDragEnd = (event: DragEndEvent) => {
		const active = event.active?.data.current?.task as Task;
		const over = event.over?.data.current as { task?: Task; column?: Column };
		setActiveTask(null);
		if (active && over) {
			const isOverTask = over.task && !over.column;
			const data = {
				column_id: isOverTask ? over.task?.column_id : over.column?.id,
				order: isOverTask ? over.task?.order : over.column!.tasks!.length + 1,
			};
			router.patch(`/api/task/${active.id}/move`, data as any);
		}
	};

	const handleDragStart = (event: DragStartEvent) => {
		setActiveTask(event.active.data?.current?.task as unknown as Task);
	};

	return (
		<AppLayout>
			<DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
				<ScrollArea className="w-full max-w-[100vw]  whitespace-nowrap">
					<div className="flex w-full mb-4 space-x-5">
						{props.space?.columns?.map((column) => {
							return (
								<TaskList
									key={`column-${column.id}`}
									column={column}
									space={props.space}
									team={props.team}
								>
									{column?.tasks?.map((task) => {
										return (
											<DroppableTaskItem key={`task-${task.id}`} task={task}>
												<DraggableTaskItem task={task}>
													<TaskItem task={task} />
												</DraggableTaskItem>
											</DroppableTaskItem>
										);
									})}
								</TaskList>
							);
						})}
						<DragOverlay>
							{activeTask ? <TaskItem task={activeTask} /> : undefined}
						</DragOverlay>
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</DndContext>
		</AppLayout>
	);
}
