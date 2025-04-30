import { DatePicker } from "@/components/date-picker";
import { StatusSelect } from "@/components/status-select";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserSelect } from "@/components/user-select";
import { Space, Column, TaskStatus, User } from "@/types";
import { useForm } from "@inertiajs/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

type CreateTaskDialogProps = {
	children?: React.ReactNode;
	space: Space;
	column: Column;
	team: User[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

type CreateTaskForm = {
	space_id: number;
	column_id: number;
	title: string;
	description?: string;
	status: TaskStatus | "";
	due_date?: Date;
	assigned_to_id?: number;
};

export const CreateTaskDialog = (props: CreateTaskDialogProps) => {
	const form = useForm<CreateTaskForm>({
		space_id: props.space.id,
		column_id: props.column.id,
		title: "",
		description: "",
		status: "",
		due_date: undefined,
		assigned_to_id: undefined,
	});

	const selectedUser = props.team.find(
		(x) => x.id === form.data.assigned_to_id,
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.post(`/api/task`, {
			preserveState: true,
			onSuccess: () => {
				props.onOpenChange(false);
			},
		});
	};
	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogTrigger asChild={props.children !== undefined}>
				{props.children ?? <PlusIcon />}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<form className="space-y-4" onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle data-dusk="create-task-dialog-title">
							Create Task for {props.column.name}
						</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<FormField
							data={form.data}
							name="title"
							render={({ field, setValue }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											data-dusk="create-task-dialog-title"
											placeholder="Enter task title"
											onChange={(e) => setValue(e.target.value)}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							data={form.data}
							name="description"
							render={({ field, setValue }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											data-dusk="create-task-dialog-description"
											placeholder="Enter task description"
											onChange={(e) => setValue(e.target.value)}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<FormField
								data={form.data}
								name="status"
								render={({ field, setValue }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<FormControl>
											<StatusSelect value={field.value} onSelect={setValue} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								data={form.data}
								name="assigned_to_id"
								render={({ setValue }) => (
									<FormItem>
										<FormLabel>Assigned To</FormLabel>
										<FormControl>
											<UserSelect
												users={props.team}
												user={selectedUser}
												onUserChange={(user) => setValue(user.id)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							data={form.data}
							name="due_date"
							render={({ field, setValue }) => (
								<FormItem>
									<FormLabel>Due date</FormLabel>
									<FormControl>
										<DatePicker date={field.value} onDateChange={setValue} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Form>
					<DialogFooter>
						<Button type="submit">Save Task</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
