"use client"

import React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

const options = [
    {
        value: "All",
        label: "All",
    },
    {
        value: "success",
        label: "Success",
    },
    {
        value: "failure",
        label: "Failure",
    }
]

export function SuccessSelector() {
    return (
        <Select defaultValue="all">
            <SelectTrigger className="w-48">
                <SelectValue placeholder="Select success status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Select success status</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failure">Failure</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export function SortSelector() {
    return (
        <Select defaultValue="recent">
            <SelectTrigger className="w-48">
                <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="recent">Recent First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}