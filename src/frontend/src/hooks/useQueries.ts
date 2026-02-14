import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  UserProfile,
  DeviceBlueprint,
  Technology,
  PlayerResearch,
  SavedGame,
  ReleasedProduct,
} from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllDeviceBlueprints() {
  const { actor, isFetching } = useActor();

  return useQuery<DeviceBlueprint[]>({
    queryKey: ['deviceBlueprints'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDeviceBlueprints();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateDeviceBlueprint() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blueprint: DeviceBlueprint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createDeviceBlueprint(blueprint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deviceBlueprints'] });
    },
  });
}

export function useGetAllTechnologies() {
  const { actor, isFetching } = useActor();

  return useQuery<Technology[]>({
    queryKey: ['technologies'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTechnologies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCompleteResearchEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (researchEntry: PlayerResearch) => {
      if (!actor) throw new Error('Actor not available');
      return actor.completeResearchEntry(researchEntry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeTechnologyResearch'] });
    },
  });
}

export function useGetActiveTechnologyResearch() {
  const { actor, isFetching } = useActor();

  return useQuery<PlayerResearch | null>({
    queryKey: ['activeTechnologyResearch'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getActiveTechnologyResearch();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSaveSlotInfos() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['saveSlots'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSaveSlotInfos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveGameToSlot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (save: SavedGame) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveGameToSlot(save);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saveSlots'] });
    },
  });
}

export function useLoadSaveSlot() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (slotId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.loadSaveSlot(slotId);
    },
  });
}

export function useRenameSaveSlot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slotId, newName }: { slotId: string; newName: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.renameSaveSlot(slotId, newName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saveSlots'] });
    },
  });
}
