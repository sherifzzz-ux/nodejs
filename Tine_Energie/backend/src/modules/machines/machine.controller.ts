import { Request, Response } from 'express';
import { createMachine, updateMachine, deleteMachine, getMachines, Machine } from './machine.service';

export function listMachines(req: Request, res: Response) {
  const name = typeof req.query.name === 'string' ? req.query.name : undefined;
  const machines = getMachines({ name });
  res.json(machines);
}

export function createMachineHandler(req: Request, res: Response) {
  const { id } = req.params;
  const name: string = req.body.name;
  const machine: Machine = {
    id,
    name,
    imageUrl: req.file ? req.file.path : undefined,
  };
  createMachine(machine);
  res.status(201).json(machine);
}

export function updateMachineHandler(req: Request, res: Response) {
  const { id } = req.params;
  const data: Partial<Machine> = {
    name: req.body.name,
    imageUrl: req.file ? req.file.path : undefined,
  };
  const updated = updateMachine(id, data);
  if (!updated) {
    return res.status(404).json({ message: 'Machine not found' });
  }
  res.json(updated);
}

export function deleteMachineHandler(req: Request, res: Response) {
  const { id } = req.params;
  const deleted = deleteMachine(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Machine not found' });
  }
  res.status(204).send();
}
