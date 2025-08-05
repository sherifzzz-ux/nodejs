export interface Machine {
  id: string;
  name: string;
  imageUrl?: string;
}

let machines: Machine[] = [];

export function getMachines(filter: { name?: string }): Machine[] {
  let result = machines;
  if (filter.name) {
    const nameFilter = filter.name.toLowerCase();
    result = result.filter((m) => m.name.toLowerCase().includes(nameFilter));
  }
  return result;
}

export function createMachine(machine: Machine): Machine {
  machines.push(machine);
  return machine;
}

export function updateMachine(id: string, data: Partial<Machine>): Machine | null {
  const index = machines.findIndex((m) => m.id === id);
  if (index === -1) {
    return null;
  }
  machines[index] = { ...machines[index], ...data };
  return machines[index];
}

export function deleteMachine(id: string): boolean {
  const initialLength = machines.length;
  machines = machines.filter((m) => m.id !== id);
  return machines.length < initialLength;
}
