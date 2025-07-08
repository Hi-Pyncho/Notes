# processes priority

В Linux планировщик процессов (scheduler) решает, сколько процессорного времени выделить каждому процессу. Приоритет (priority) и "вежливость" (niceness) помогают управлять этим распределением.

a) Приоритет (Priority)
Это число от 0 до 139, определяющее порядок выполнения процессов.
0–99 – реального времени (RT priority, требует прав root).
100–139 – обычные пользовательские процессы (чем меньше число, тем выше приоритет).

b) Niceness (вежливость)
Это значение (-20 до 19), влияющее на приоритет планирования:
Чем ниже nice-значение → тем выше приоритет (процесс получает больше CPU).
Чем выше nice-значение → тем ниже приоритет (процесс "вежливый", уступает CPU другим).
По умолчанию процессы запускаются с nice=0.

## nice
Execute a program with a custom scheduling priority (niceness).
Niceness values range from -20 (the highest priority) to 19 (the lowest).
More information: <https://www.gnu.org/software/coreutils/manual/html_node/nice-invocation.html>.

Launch a program with altered priority:

    nice -niceness_value command

Define the priority with an explicit option:

    nice [-n|--adjustment] niceness_value command

## renice

Alter the scheduling priority/niceness of running processes.
Niceness values range from -20 (most favorable to the process) to 19 (least favorable to the process).
See also: `nice`.
More information: <https://manned.org/renice>.

Set the absolute priority of a running process:

    renice --priority 3 [-p|--pid] pid

Increase the priority of a running process:

    sudo renice --relative -4 [-p|--pid] pid

Decrease the priority of all processes owned by a user:

    renice --relative 4 [-u|--user] uid|user

Set the priority of all processes that belong to a process group:

    sudo renice -5 [-g|--pgrp] process_group
