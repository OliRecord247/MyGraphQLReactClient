import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import type { Todo } from "../types/todo";

export const TODOS = gql`
  query Todos {
    todos {
      id
      text
      done
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(input: { text: $text }) {
      id
      text
      done
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation Toggle($id: ID!) {
    toggleTodo(id: $id) {
      id
      done
    }
  }
`;

export const DELETE_TODO = gql`
  mutation Delete($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const useTodos = () => {
  const { data, loading, error } = useQuery<{ todos: Todo[] }>(TODOS);

  const [addTodo] = useMutation<{ addTodo: Todo }>(ADD_TODO, {
    refetchQueries: [TODOS],
  });

  const [toggleTodo] = useMutation<{
    toggleTodo: { id: string; done: boolean };
  }>(TOGGLE_TODO);

  const [deleteTodo] = useMutation<{ deleteTodo: boolean }>(DELETE_TODO, {
    refetchQueries: [TODOS],
  });

  return {
    data,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
